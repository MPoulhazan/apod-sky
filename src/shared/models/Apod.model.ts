export interface Apod {
    copyright: string;
    date: string;
    explanation: string;
    hdurl: string;
    media_type: 'image' | 'video';
    service_version: string;
    title: string;
    url: string;
}

export const getInitializedApod = (): Apod => {
    return {
        copyright: '',
        date: '',
        explanation: '',
        hdurl: '',
        media_type: 'image',
        service_version: '',
        title: '',
        url: '',
    };
};
