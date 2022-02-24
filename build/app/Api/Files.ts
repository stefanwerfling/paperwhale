import {JsonController, Post, Session, UploadedFile} from 'routing-controllers';

@JsonController()
export class Files {

    @Post('/api/v1/putfile')
    public async putFile(
        @UploadedFile('file') file: any,
        @Session() session: any
    ): Promise<void> {
        console.log('test');
    }

}