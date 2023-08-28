import fs from "fs";

export default class FileUtil {
    public static readdirRecursive(dir: string) {
        const files: string[] = [];

        for (const file of fs.readdirSync(dir)) {
            const filePath = `${dir}/${file}`;
            if (fs.statSync(filePath).isDirectory()) {
                files.push(...FileUtil.readdirRecursive(filePath));
            } else {
                files.push(filePath);
            }
        }

        return files;
    }
}