import { IqAirProvider } from "./providers/iqair.provider.js";

const result = await (new IqAirProvider()).getIndexByCityUrl('https://www.iqair.com/kazakhstan/east-kazakhstan/oskemen/clearsky');

console.log(result);