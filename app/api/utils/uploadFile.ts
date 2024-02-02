/*
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const uploadDir = './public/uploads';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

export function uploadFile(file: File) {
  const fileName = `${uuidv4()}-${file.name}`;
  const filePath = path.join(uploadDir, fileName);

  return new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(filePath);

    fileStream.on('finish', () => {
      resolve(fileName);
    });

    fileStream.on('error', (error) => {
      fs.unlinkSync(filePath);
      reject(error);
    });

    file.pipe(fileStream);
  });
}
*/