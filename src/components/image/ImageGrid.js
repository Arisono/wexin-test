/**
 * Created by Arison on 2018/12/3.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
/**
 * Created by Arison on 16:55.
 */
class ImageGrid extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'ImageGrid',
            rate: this.props.match.params.num,
            images:[
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543289918586&di=a22036279c9e4a86f03cdd9996a8a0f5&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D0645f21b46086e067ea537086a611181%2F1c950a7b02087bf4b40d39c3f8d3572c11dfcf33.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543289918584&di=beb8b53a7e5544a0f9f4c24b6c992a4b&imgtype=0&src=http%3A%2F%2Fpic34.photophoto.cn%2F20150311%2F0005018318132246_b.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543289918579&di=d579d076328b42dac2924ce2a2524bc8&imgtype=0&src=http%3A%2F%2Fpic25.photophoto.cn%2F20121230%2F0010023534858256_b.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543289918576&di=33bc85167aca41998561827abee641c7&imgtype=0&src=http%3A%2F%2Fpic25.photophoto.cn%2F20121230%2F0044040929574945_b.jpg'
            ]
        };
    }
    
    
    componentDidMount(){
        
    }
   
    render(){
        return <div className="flex flex_row_stretch">
            <div className="">
                {this.state.images.map((item)=>{
                    console.log("()",100/this.state.rate);
                    return ( <img  className="border_lightGreen item_flex" style={{padding:"7px"}} src={item}   width={100/this.state.rate+"%"}  />);
                })}
            </div>
        </div>
    }
}

export  default ImageGrid;