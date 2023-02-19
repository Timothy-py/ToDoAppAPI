import { Controller } from '@nestjs/common';

// export const BasePath = (...args: string[]) => SetMetadata('base-path', args);

export const BasePath = (path: string) => {
    return (target: any) => {
        Controller(`api/v1/${path}`)(target)
    }
}
