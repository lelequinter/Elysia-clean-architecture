
export class Post {
  constructor(
    private readonly id: string,
    private readonly desciption: string,
    private images: string,
    private readonly userId: string,
  ) {}

  getImage(){
    return this.images
  }

  setImage(url: string){
    this.images = url;
  }
}
