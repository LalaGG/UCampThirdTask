import bs from 'browser-sync';

bs.create().init({ watch: true, server: './app'})
