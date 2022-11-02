#!/usr/bin/env node
import {Command} from 'commander';
import {CreateCommand} from './create.command';

const program = new Command();
const create = new CreateCommand();
program.version('0.0.1');
program
    .addCommand(create);
program.parse(process.argv);
