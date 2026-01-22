import * as cheerio from 'cheerio';

export class IqAirProvider {
    /**
     * CSS селектор блока с баллами IQ Air на странице города
     */
    protected static readonly indexValueCssSelector = '#main-content [class*="aqi-box-shadow-"] p.text-lg.font-medium';

    /**
     * Значение User-Agent для запроса HTML страницы
     */
    protected static readonly requestUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

    /**
     * Получить баллы IQ Air по URL города
     * @param cityUrl URL города
     * @returns Баллы IQ Air
     */
    async getIndexByCityUrl(cityUrl: string): Promise<number> {
        return this._getIndexFromCityPageHtml(
            await this._getCityPageHtml(cityUrl)
        );
    }

    /**
     * Получить HTML тело страницы города
     * @param cityUrl URL страницы города
     * @returns HTML страницы города
     */
    async _getCityPageHtml(cityUrl: string): Promise<string> {
        const response = await fetch(cityUrl, {
            headers: {
                'User-Agent': IqAirProvider.requestUserAgent,
            }
        });

        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);

        return response.text();
    }

    /**
     * Получить баллы IQ Air из HTML страницы города
     * @param pageHtml HTML страницы города
     * @returns {number} Баллы IQ Air
     */
    _getIndexFromCityPageHtml(pageHtml: string): number {
        const $ = cheerio.load(pageHtml);
        const indexValueNode = $(IqAirProvider.indexValueCssSelector);
        
        // Элемент найден
        if (indexValueNode.length > 0)
        {
            return Number(indexValueNode.text().trim());
        }
        // Элемент не найден
        else
        {
            return 0;   // TODO: Генерировать ошибку
        }
    }
}