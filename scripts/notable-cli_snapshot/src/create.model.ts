import { Command, CommandOptions, Option } from 'commander';

interface CreateCommandOptions extends CommandOptions {
  git: boolean;
}