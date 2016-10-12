# Help
If no parameters are given the app searches a file called ```.youcoolapprc```. Content should look like the following example:

```js
// file contents of .youcoolapprc -> 
{
    setting1 : true,
    setting2 : false,
    targetfolder : "./out/
}
```

## Usage

```sh
youcoolapp [--targetfolder ./out];
```

## Parameters
|Name|Description|
|----|-----------|
|--init|create a runcom file|
|--outputfolder|Targetfolder for all files.|
|help, --help, /? |Show this help.|
|version, --version, -v|Show version.|