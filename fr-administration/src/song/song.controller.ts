import {Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {SongService} from "./song.service";
import {ApiCreatedResponse} from "@nestjs/swagger";
import {SongInput} from "./song.input";
import {Song} from "./song.entity";
import {User} from "../users/user.entity";
import * as fs from "fs";
import {UserInput} from "../users/user.input";

@Controller('Song')
export class SongController {

    constructor(private service: SongService) {
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The song has been successfully created.'
    })
    public async create(@Body() input: SongInput): Promise<Song> {
        return this.service.create(input.link, input.start, input.end, input.name, input.group);
    }

    @Get()
    @ApiCreatedResponse({
        description: 'Songs have been successfully returned'
    })
    async getAllSongs(): Promise<Song[]> {
        return await this.service.getAllSongs();
    }


    @Get(':id')
    @ApiCreatedResponse({
        description: 'Song has been successfully returned'
    })
    async getById(@Param() parameter): Promise<Song> {
        const a = this.service.getById(parameter.id);
        if (a != undefined) {
            return a;
        } else {
            throw new HttpException(
                `Could not find a song with the id ${parameter.id}`,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @Post('load')
    @ApiCreatedResponse({
        description: 'Song has been successfully returned'
    })
    async load(@Param() parameter,@Body() input: any): Promise<void> {
        this.service.clear();
        let k=0;
        fs.readFile(input.filePath, 'utf-8', (err, data) => {
            if (err) {
                console.error('Erreur de lecture du fichier :', err);
                return;
            }
            const lines: string[] = data.split('\n');
            lines.forEach((line: string) => {
                const dataArray: string[] = line.split('|');
                //console.log(dataArray);
                if (dataArray.length > 0) {
                    dataArray[0] = dataArray[0].replace('watch?v=', 'embed/');
                }
                if (dataArray.length > 0) {
                    dataArray[3] = dataArray[3].replace(/\r/g, '');
                }
                this.service.create(dataArray[0], parseInt(dataArray[1]), parseInt(dataArray[2]), dataArray[3], dataArray[4]);
            });
        });
    }


    @Put('roll')
    @ApiCreatedResponse({
        description: 'Song has been successfully returned'
    })
    async Roll(): Promise<Song> {
        let r = Math.floor(Math.random() *
            (await this.service.getMaxId() - await this.service.getSmallestId()+1) + await this.service.getSmallestId())
         const a = await this.service.getById(r);
        console.log(a);
        return a;
    }

}
