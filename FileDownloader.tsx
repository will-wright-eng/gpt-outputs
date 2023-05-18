import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import FileSaver from 'file-saver';

import { YOUR_ACCESS_KEY_ID, YOUR_SECRET_ACCESS_KEY, YOUR_BUCKET_NAME, REGION } from '../utils/secrets';

function FileDownloader() {
  const [files, setFiles] = useState([{Key}]);

  useEffect(() => {
    // Initialize the AWS SDK with your credentials
    AWS.config.update({
      region: REGION,
      accessKeyId: YOUR_ACCESS_KEY_ID,
      secretAccessKey: YOUR_SECRET_ACCESS_KEY,
    });

    // Create an S3 client
    const s3 = new AWS.S3();

    // Retrieve a list of available files from S3
    s3.listObjects({ Bucket: YOUR_BUCKET_NAME }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        // setFiles(data.Contents);
        const objects = data.Contents?.map(obj => obj.Key);
        console.log(objects);
      }
    });
  }, []);

  const handleDownload = (file) => {
    // Create an S3 client
    const s3 = new AWS.S3();

    // Download the file from S3
    s3.getObject({ Bucket: YOUR_BUCKET_NAME, Key: file.Key }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        // Save the file to the user's computer
        const blob = new Blob([data.Body], { type: data.ContentType });
        FileSaver.saveAs(blob, file.Key);
      }
    });
  };

  handleDownload();

  return (
    <div>
      <ul>
        {files.map((file) => (
          <li key={file.Key}>
            {file.Key} ({file.Size} bytes)
             <button onClick={() => handleDownload(file)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileDownloader;
