interface art{
    name: string;
    ThumbnailPath?: string;
    isVideo?: boolean;
    detail: string;
}

export const artInfos: art[] = [
    {
        name: 'DotPaint',
        ThumbnailPath: '',
        detail: '웹에서 도트를 찍을수 있는 그림판'
    },
    {
        name: 'Drain',
        ThumbnailPath: '',
        detail: '검색 엔진 형태의 웹 게임'
    },
    {
        name: 'MariGold',
        ThumbnailPath: '',
        detail: '리듬게임'
    },
    {
        name: 'MoonShadow',
        ThumbnailPath: '',
        detail: '점점 난이도가 올라가는 스테이지를 클리어하는 게임'
    },
    {
        name: 'Note2D',
        ThumbnailPath: '',
        detail: '2D 공간에 마음대로 채팅, 투두리스트, MIDI, 유튜브 영상 등의 모듈들을 배치할 수 있는 실시간 샌드박스 플랫폼'
    },
    {
        name: 'UJS',
        ThumbnailPath: '',
        detail: '웹앱이 로컬에서 코드를 돌릴 수 있도록 해 주는 플랫폼'
    },
    {
        name: 'UJS_Discord',
        ThumbnailPath: '',
        detail: 'UJS를 통해 디스코드 봇을 만드는 웹앱'
    },
    {
        name: 'UJS_MCS',
        ThumbnailPath: '',
        detail: 'UJS를 통해 마인크래프트 서버를 실행하는 웹앱'
    },
    {
        name: 'YaCHT',
        ThumbnailPath: '',
        detail: '온라인 야추'
    }
];