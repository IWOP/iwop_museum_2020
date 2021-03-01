import * as THREE from 'three'
/**
 * @todo is video 를 구현시켜야 합니다.
 */
interface art{
    name: string;
    ThumbnailPath: string;
    Thumb2Texture?: THREE.Texture;
    isVideo?: boolean;
    ratio?: number; 
    detail: string;
}

export const artInfos: art[] = [
    {
        name: 'DotPaint',
        ThumbnailPath: './resources/images/arts/DotPaint.png',
        detail: '웹에서 도트를 찍을수 있는 그림판'
    },
    {
        name: 'Drain',
        ThumbnailPath: './resources/images/arts/Drain.png',
        detail: '검색 엔진 형태의 웹 게임'
    },
    {
        name: 'MariGold',
        ThumbnailPath: './resources/images/arts/MariGold.png',
        detail: '리듬게임'
    },
    {
        name: 'MoonShadow',
        ThumbnailPath: './resources/images/arts/MoonShadow.png',
        detail: '점점 난이도가 올라가는 스테이지를 클리어하는 게임'
    },
    {
        name: 'Note2D',
        ThumbnailPath: './resources/images/arts/Note2D.png',
        detail: '2D 공간에 마음대로 채팅, 투두리스트, MIDI, 유튜브 영상 등의 모듈들을 배치할 수 있는 실시간 샌드박스 플랫폼'
    },
    {
        name: 'UJS',
        ThumbnailPath: './resources/images/arts/UJS.png',
        detail: '웹앱이 로컬에서 코드를 돌릴 수 있도록 해 주는 플랫폼'
    },
    {
        name: 'UJS_Discord',
        ThumbnailPath: './resources/images/arts/UJS_Discord.png',
        detail: 'UJS를 통해 디스코드 봇을 만드는 웹앱'
    },
    {
        name: 'UJS_MCS',
        ThumbnailPath: './resources/images/arts/UJS_MCS.png',
        detail: 'UJS를 통해 마인크래프트 서버를 실행하는 웹앱'
    },
    {
        name: 'YaCHT',
        ThumbnailPath: './resources/images/arts/YaCHT.png',
        detail: '온라인 yahtzee'
    }
];