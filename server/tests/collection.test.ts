import { Collection } from './../src/collection';
import { Test, Type } from '../src/phpunit';
import { TextDocument, DiagnosticSeverity, Range } from 'vscode-languageserver';
import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('Collection Test', () => {
    it('it should put tests and remove same tests', () => {
        const collect: Collection = new Collection();

        const oldTests: Test[] = [
            {
                name: 'method_1',
                class: 'foo',
                classname: 'string',
                file: 'foo',
                line: 10,
                range: Range.create(9, 1, 9, 1),
                time: 1,
                type: Type.PASSED,
            },
            {
                name: 'method_2',
                class: 'foo',
                classname: 'string',
                file: 'foo',
                line: 20,
                range: Range.create(19, 1, 19, 1),
                time: 1,
                type: Type.PASSED,
            },
        ];

        collect.put(oldTests);

        expect(collect.get('foo')).toEqual([
            {
                name: 'method_1',
                class: 'foo',
                classname: 'string',
                file: 'foo',
                line: 10,
                range: Range.create(9, 1, 9, 1),
                time: 1,
                type: Type.PASSED,
            },
            {
                name: 'method_2',
                class: 'foo',
                classname: 'string',
                file: 'foo',
                line: 20,
                range: Range.create(19, 1, 19, 1),
                time: 1,
                type: Type.PASSED,
            },
        ]);

        const newTests: Test[] = [
            {
                name: 'method_1',
                class: 'foo',
                classname: 'string',
                file: 'foo',
                line: 10,
                range: Range.create(9, 1, 9, 1),
                time: 2,
                type: Type.PASSED,
            },
            {
                name: 'method_3',
                class: 'foo',
                classname: 'string',
                file: 'foo',
                line: 30,
                range: Range.create(29, 1, 29, 1),
                time: 1,
                type: Type.PASSED,
            },
            {
                name: 'method_1',
                class: 'bar',
                classname: 'string',
                file: 'bar',
                line: 10,
                range: Range.create(9, 1, 9, 1),
                time: 2,
                type: Type.PASSED,
            },
        ];

        collect.put(newTests);

        expect(collect.get('foo')).toEqual([
            {
                name: 'method_1',
                class: 'foo',
                classname: 'string',
                file: 'foo',
                line: 10,
                range: Range.create(9, 1, 9, 1),
                time: 2,
                type: Type.PASSED,
            },
            {
                name: 'method_2',
                class: 'foo',
                classname: 'string',
                file: 'foo',
                line: 20,
                range: Range.create(19, 1, 19, 1),
                time: 1,
                type: Type.PASSED,
            },
            {
                name: 'method_3',
                class: 'foo',
                classname: 'string',
                file: 'foo',
                line: 30,
                range: Range.create(29, 1, 29, 1),
                time: 1,
                type: Type.PASSED,
            },
        ]);

        expect(collect.get('bar')).toEqual([
            {
                name: 'method_1',
                class: 'bar',
                classname: 'string',
                file: 'bar',
                line: 10,
                range: Range.create(9, 1, 9, 1),
                time: 2,
                type: Type.PASSED,
            },
        ]);
    });
});