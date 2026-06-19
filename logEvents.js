import { fileURLToPath } from "url";
import { format } from 'date-fns';
import { v4 as uuidv4 } from "uuid";
import * as fs from 'fs';
import fsPromises from 'fs/promises';
const __dirname = dirname(fileURLToPath(import.meta.url));
import { dirname } from "path";



console.log(format(new Date(), 'dd MM yyyy\tHH:mm:ss'));
console.log(uuidv4());
console.log(__dirname);