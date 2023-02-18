import { Global, Module } from "@nestjs/common";

@Global()
@Module({
    providers: [],
    exports: []
})
export class PrefixModule {
    static forRoot(prefix: string): any {
        return {
            module: PrefixModule,
            providers: [
                {
                    provide: 'PREFIX',
                    useValue: prefix
                }
            ],
            exports: ['PREFIX']
        }
    }
}