export const MAIN_PATH = () => '/';
export const AUTH_PATH = () => '/auth';
export const SEARCH_PATH = (searchWord: string) => `/search/${searchWord}`;
export const USER_PATH = (useremail: string) => `/user/${useremail}`;
export const BOARD_PATH = () => '/board';
export const BOARD_DETAIL_PATH = (boardnumber: string | number) => `detail/${boardnumber}`;
export const BOARD_WRITE_PATH = () => 'write';
export const BOARD_UPDATE_PATH = (boardnumber: string | number) => `update/${boardnumber}`;