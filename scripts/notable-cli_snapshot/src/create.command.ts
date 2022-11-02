#!/usr/bin/env node
import {Command, OptionValues} from 'commander';
import {execSync} from 'child_process';
import {Util} from './util';
import {MarkdownBuilder, MarkdownFile} from './markdown.builder';
import fs from 'fs';
import colors from 'colors';
import * as config from './config.json';


interface CreateOptionValues extends OptionValues {
  git: boolean;
  date: boolean;
  force: boolean;
  open: boolean;
}

export class CreateCommand extends Command {
  private readonly createOptions: CreateOptionValues;

  constructor() {
    super('create');
    this.arguments('[title]')
        .option('-g, --git', 'create a note from the current git branch')
        .option('-d, --date', 'add the creation date to the markdown file')
        .option('-f, --force', 'force overwrite of note')
        .option('-o, --open', 'open created note in notable')
        .description('create a new note', {
          title: 'note title',
        }).parse();
    this.createOptions = this.opts() as CreateOptionValues;

    this.action((title) => {
      const markdownBuilder = new MarkdownBuilder();

      if (title) {
        markdownBuilder.withTitle(title);
      } else {
        markdownBuilder.withTitle(config.defaultNoteName);
      }

      if (this.createOptions.git) {
        // Top-level async / await syntax
        const gitTitle = CreateCommand.getLocalGitBranchName();
        markdownBuilder
            .withTitle(gitTitle)
            .withMetaHeader(gitTitle, [config.tags.git]);
      }

      const markdownFile = markdownBuilder.build();
      const markdownContents = markdownBuilder.toString();

      Util.writeFile(markdownFile.title.title, markdownContents, this.createOptions.force);
      if (this.createOptions.open) {
        Util.openFile(markdownFile.title.title);
      }
    });
  }

  private static getLocalGitBranchName(): string {
    try {
      const result = execSync('git rev-parse --abbrev-ref HEAD');
      return result.toString().trim();
    } catch (err) {
      console.error(colors.red(err));
      return '';
    }
  };
}
