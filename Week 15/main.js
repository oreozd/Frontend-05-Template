//import createElement from './framework'
import {Component, createElement} from './framework'

class Carousel extends Component{
    constructor() {
        super();
        this.attributes = Object.create(null);
    }
    setAttribute(name, value){
        console.log("name, value", name, value)
        this.attributes[name] = value;
    }
    render(){
        this.root = document.createElement("div");
        for(let record of this.attributes.src){
            let child = document.createElement("img"); 
            child.src = record;
            this.root.appendChild(child);import { Component, createElement } from './framework.js'
            import { Carousel } from './carousel.js'
            import { Timeline, Animation } from './animation.js'
            import { Button } from './Button.js'
            import { List } from './List.js'
            
            let d = [
                {
                    img: "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
                    url: "https://time.geekbang.org",
                    title: "懒猫"
                },
                {
                    img: "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
                    url: "https://time.geekbang.org",
                    title: "懒猫"
                },
                {
                    img: "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
                    url: "https://time.geekbang.org",
                    title: "懒猫"
                },
                {
                    img: "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
                    url: "https://time.geekbang.org",
                    title: "懒猫"
                }
            ]
            // let a = <Carousel src={d} 
            //     onChange={event => console.log(event.detail.position)}
            //     onClick={event => {window.location = event.detail.data.url;}}
            //     />
            
            // let a = <Button>content</Button>
            let a = <List data={d}>
                {(record) =>
                    <div>
                        <img src={record.img} />
                        <a href={record.url}>{record.title}</a>
                    </div>
                }
            </List>
            a.mountTo(document.body);
            
            // let tl = new Timeline();
            // window.tl = tl;
            // window.animation = new Animation({ set a(v){console.log(v)}}, "a", 0, 100, 1000, null);
            // tl.start();
        }
        return this.root;
    }
    mountTo(parent){
        parent.appendChild(this.render());
    }
}

let d = [
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
];

let a = <Carousel src={d}/>
a.mountTo(document.body);