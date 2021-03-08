import mongoose from 'mongoose';

import getConfig from '../../config';

let currentConnectionString = null;

(async () => {
  await getConfig(async (config) => {
    console.log('DB config is: ', config);
    console.log(
      'Baby, I am at the gate, ',
      config && 'db' in config && config.db.cs !== currentConnectionString
    );
    if (config && 'db' in config && config.db.cs !== currentConnectionString) {
      try {
        if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
        console.log('Baby, I am here', config.db.cs);
        await mongoose.connect(config.db.cs, {
          connectTimeoutMS: 2000,
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
        });
        currentConnectionString = config.db.cs;
        console.log('Database connected successfully');
      } catch (err) {
        console.error(
          'ERROR: Database failed to connect to mongo at ',
          config.db.cs
        );
        // process.exit(21);
      }
    }
  });
})();
