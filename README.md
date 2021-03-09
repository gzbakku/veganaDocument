# Vegana Document

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

vegana document is a gui based editor for building simple vegana pages like articles, it builds a format called vDoc which can be published by using a vDovViews component.

## format structure

```json
{
    template:['row1','row2'],//row id by order
    rows:{//rows object with id as key
        row1:{
            id:"row1",
            template:['cont1','cont2'],
            containers:{
                cont1:{
                    id:'cont1',
                    field:{
                        type:'heading',
                        data:{
                            value:"heading 1"
                        }
                    }
                },
                cont2:{
                    id:'cont2',
                    field:null
                }
            }
        },
        row2:{
            id:'row2',
            template:[],//conatiner id by order
            containers:{}//conatiners with id as key
        }
    }
}
````


## Suppoted Components

- Heading
- Paragraph
- Image
- code

## div structuring

* article
    * rows
        * row
            * containers
                * container
                    * field
                        * field type

## movements

- each row can be moved up and down as per need and conatins containers
- each container can be shifted to the left as needed
- containers are floating towards left in its parent directory

## stack

- vegana js
- javascript
- sass
- electron builder

## development

```
$ npm i
$ vegana serve
$ vegana electron build
```
