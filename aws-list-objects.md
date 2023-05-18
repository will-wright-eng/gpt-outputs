Sure, here's an example function component in JavaScript using React that lists objects in an AWS bucket and includes a downloadable link to each object:

```jsx
import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

const S3_BUCKET = 'your-bucket-name';
const REGION = 'your-bucket-region';
const ACCESS_KEY = 'your-access-key';
const SECRET_KEY = 'your-secret-key';

const ListObjects = () => {
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    const s3 = new AWS.S3({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_KEY,
      region: REGION
    });

    s3.listObjects({ Bucket: S3_BUCKET }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        setObjects(data.Contents);
      }
    });
  }, []);

  return (
    <div>
      <h2>List of Objects in {S3_BUCKET}</h2>
      <ul>
        {objects.map((object, index) => (
          <li key={index}>
            <a href={`https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${object.Key}`} download>
              {object.Key}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListObjects;
```

This component uses the AWS SDK for JavaScript to list objects in an S3 bucket and then maps over the resulting array of objects to create a list with a downloadable link for each object. You'll need to replace the `S3_BUCKET`, `REGION`, `ACCESS_KEY`, and `SECRET_KEY` constants with your own values.
