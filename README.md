# rrome-pouch

PouchDB bindings for Rrome

## Installation

```javascript
npm install --save https://github.com/Metamorphic-Studios/rrome-pouch
```

## Usage
```javascript

import PouchConnector from 'rrome-pouch';
import { Form } from 'rrome-react';

const connector = new PouchConnector(opts);

<Form 
   struct={}
   content={}
   connector={connector} />

```

## Options

#### url 

Url of remote pouchdb instance

#### username

Username for remote db

#### password

Password for remote db user


