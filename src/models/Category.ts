export class Category {
    title: string;
    icon: string; //ionic icon name from https://ionicframework.com/docs/v2/ionicons/

    constructor(title:string, icon:string) {
        this.title = title;
        this.icon = icon;
    }
}