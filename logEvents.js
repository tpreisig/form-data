import { mkdir, appendFile } from 'fs/promises';
import { fileURLToPath } from "url";
import { format } from 'date-fns';
import { v4 as uuid } from "uuid";
import { dirname, join } from "path";
import { existsSync } from 'fs'; // Used to check if directory exists

const __dirname = dirname(fileURLToPath(import.meta.url));

const logEvents = async (message) => {
    const dateTime = format(new Date(), 'yyyy/MM/dd HH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`; // 2. Added '\n' at the end
    console.log(logItem);

    try {
        const logDirectory = join(__dirname, 'logs');
        // let's make sure the 'logs' folder exists
        if (!existsSync(logDirectory)) {
            await mkdir(logDirectory, { recursive: true });
        }
        await appendFile(join(logDirectory, 'userData.txt'), logItem);
    } catch (err) {
        console.error(err);
    }
}

export default logEvents;
