/**
 * Created by delmarhager on 5/25/15.
 */
var assert = require('assert');
var navigator = require('../../app/js/navigator');
var index = require('./data/resources');
var path = require('path');
var resources = require('../../app/js/loadResources');
var dataDir = __dirname + path.sep + 'data';
var bookSource = require('./data/1ch.en.ulb.source.json');
var languageResource = require('./data/languageResource.json');
var projectResource = require('./data/projectResource.json');
var firstCo = require('./data/1co.json');
var firstCo13 = firstCo.chapters[12];
var firstCo13Frame = firstCo.chapters[12].frames[2];
var pr = new resources.resources(dataDir);


describe('@Reader', function () {
    beforeEach(function(done) {
        pr.setOptions ({index:index, rootDir:dataDir});
        navigator.setResources(pr);
        done();
    });




    describe('@checkIndexing ', function () {
        it('should set and get index', function () {
            var pr = new resources.resources(dataDir);
            var newIndex = {a: { b: {c: 'c'}}};
            pr.setTsIndex(newIndex);
            assert.equal(JSON.stringify( pr.tsIndex()).replace(/ /g, ''),JSON.stringify(newIndex).replace(/ /g, '') );
        })
    })


    describe('@getResourcePathProject ', function () {
        it('should retrieve a 1ch project lang_catalog path', function () {
            var text = '/agilebuilders/ts-desktop/unit_tests/navigator/data/tsFiles/ts/txt/2/1ch/languages.json';
            assert.equal(navigator.getResourcePath('1ch.lang_catalog', index, dataDir), text);
        })
    })

    describe('@getResourcePathArabicSource ', function () {
        it('should retrieve a 1ch ar udb source path', function () {
            var text = '/agilebuilders/ts-desktop/unit_tests/navigator/data/tsFiles/ts/txt/2/1co/ar/avd/source.json';
            assert.equal(navigator.getResourcePath('1co.ar.avd.source',index, dataDir), text);
        })
    })

    describe('@readProject ', function () {
        it('should retrieve the 1ch project', function () {
            assert.equal(JSON.stringify(navigator.readProject('1ch', {index:index, rootDir:dataDir})).replace(/ /g, ''), JSON.stringify(projectResource).replace(/ /g, ''));
        })
    })


    describe('@ReadLangurage ', function () {
        it('should retrieve the 1ch project', function () {
            assert.equal(JSON.stringify(navigator.open('1ch','en' )).replace(/ /g, ''), JSON.stringify(languageResource).replace(/ /g, ''));
        })
    })


    describe('@ReadSource ', function () {
        it('should retrieve the 1ch project', function () {
            assert.equal(JSON.stringify(navigator.open('1ch','en','ulb')).replace(/ /g, ''), JSON.stringify(bookSource).replace(/ /g, ''));
        })
    })

    describe('@ReadSourceChapter ', function () {
        it('should retrieve the 1co chapter', function () {
            assert.equal(JSON.stringify(navigator.open('1co','en','udb','13')).replace(/ /g, ''), JSON.stringify(firstCo13).replace(/ /g, ''));
        })
    })

    describe('@ReadSourceChapterFrame ', function () {
        it('should retrieve the 1co frame', function () {
            assert.equal(JSON.stringify(navigator.open('1co','en','udb','13','3')).replace(/ /g, ''), JSON.stringify(firstCo13Frame).replace(/ /g, ''));
        })
    })


    describe('@ReadBadProject ', function () {
        it('should not retrieve the 1co frame', function () {
            assert.equal(navigator.open('1coc','en','udb','13','3'), null);
        })
    })


    describe('@ReadSourceChapterBadFrame ', function () {
        it('should not retrieve the 1co Bad frame', function () {
            assert.equal(navigator.open('1co','en','udb','13','30'), null);
        })
    })

    describe('@ReadSourceChapterToManyArgs ', function () {
        it('should not retrieve the 1co To many args', function () {
            assert.equal(navigator.open('1co','en','udb','13','30','40'), null);
        })
    })


    describe('@ReadSourceNoArgs ', function () {
        it('should not retrieve no args', function () {
            assert.equal(navigator.open(), null);
        })
    })

    describe('@ReadSourceChapterBadResource ', function () {
        it('should not retrieve the 1co Bad Resource', function () {
            assert.equal(navigator.open('1co','en','ddd','13','30'), null);
        })
    })


    describe('@ReadProject ', function () {
        it('should retrieve the 1ch source', function () {
            assert.equal(JSON.stringify(navigator.open('1ch' )).replace(/ /g, ''), JSON.stringify(projectResource).replace(/ /g, ''));
        })
    })
})
