# DiaKEM LibreLinkUp Api Client

Fetch cgm data of FreeStyle Libre 2/3 directly from abbot's sharing service.

## Description

This client allows you to connect to abbot's sharing server which is also used by its application **LibreLinkUp**.

If you plan to implement your own client or are interested in the sharing api you can find detailed
information here: https://gist.github.com/khskekec/6c13ba01b10d3018d816706a32ae8ab2

## Installation

Simply install the package via your favorite package manager:
```
npm i @diakem/libre-link-up-api-client
```

## Usage

The client only needs your *LibreLinkUp* credentials to connect to the sharing service and retrieve
cgm data. You do not need to take care of login - the client will handle the initial login and
also do it if your session expires.

### read()
```javascript
import {LibreLinkUpClient} from '@diakem/libre-link-up-api-client';

const {read} = LibreLinkUpClient({username: 'myLibreLinkUpEmailAddress', password: 'pAssw0rd!', clientVersion: '4.9.0'});

const response = await read();
```

You will get the following data structure:

```typescript
export type LibreCgmData = {
  value: number,
  isHigh: boolean,
  isLow: boolean,
  trend: TrendType,
  date: Date
}
```

### readRaw()
You have also the possibility to retrieve the raw response returned by the sharing service:

```javascript
import {LibreLinkUpClient} from '@diakem/libre-link-up-api-client';

const {readRaw} = LibreLinkUpClient({username: 'myLibreLinkUpEmailAddress', password: 'pAssw0rd!', clientVersion: '4.9.0'});

const response = await readRaw();
```

You will get the following data structure:

```typescript
type ReadRawResponse = {
  connection: Connection,
  activeSensors: ActiveSensor[],
  graphData: GlucoseItem[]
};
```

### readAveraged()

Get average data.

* `amount: number`: Amount of data which should be collected before calculating the average
* `callback: function`: Callback function which will be invoked if `amount` of data was collected and average can be calculated
* `interval: number (DEFAULT: 15 seconds)`: Milliseconds between each call to the service

```javascript
import {LibreLinkUpClient} from '@diakem/libre-link-up-api-client';

const {readAveraged} = LibreLinkUpClient({username: 'myLibreLinkUpEmailAddress', password: 'pAssw0rd!', clientVersion: '4.9.0'});

const callback = (average, memory) => {
  console.log({
      average,
      memory
  });  
};

const response = await readAveraged(5, callback, 15000);
```

The callback method will receive the following parameters:

```typescript
// Average dataset
average: LibreCgmData,
// All cgm data which was used to calculate average data
memory: LibreCgmData[]
// All historical readings available at the sharing service
history: LibreCgmData[]
```



## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. 
Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. 
You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

* Fork the Project
* Create your Feature Branch (git checkout -b feature/AmazingFeature)
* Commit your Changes (git commit -m 'Add some AmazingFeature')
* Push to the Branch (git push origin feature/AmazingFeature)
* Open a Pull Request

### Standards

This project is using commit hooks to ensure code quality and prevent code smell. This will be done by ESLint and Prettier.
If there are noticeable problems with your code the commit will be rejected. Furthermore convential commits are used to
standardize commit messages to generate changelogs automatically.

## Showcase

* [LibreLinkUpDesktop](https://github.com/Crazy-Marvin/LibreLinkUpDesktop)

## License

Distributed under the MIT License.

## Contact

Selcuk Kekec

E-mail: [khskekec@gmail.com](khskekec@gmail.com)
