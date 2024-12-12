export interface MESSAGE {
    dbconnect:string;
    reqAccessToken:string;
    invalidAccessToken:string;
    invalidEmail:string;
    invalidPassword:string
    dataNotFound:string
}


export interface STATUS {
    statusTrue: boolean;
    statusFalse: boolean;
  }

export interface CODE {
    success: number;
    FRBDN: number;
    dataNotFound: number;
    badRequest: number;
    unAuthorized: number;
    preconditionFailed: number;
    internalServerError: number;
    expectationFailed: number;
  }

export interface Priority {
    low:string;
    medium:string,
    high:string
}


export interface TASKSTATUS {
    inprogress:string,
    completed:string
}