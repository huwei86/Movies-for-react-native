/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

/**
 * Created by ASSU on 2016/11/17.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image
} from 'react-native';
const Api_url="https://api.douban.com/v2/movies/top250";
class ListView extends Component {
    constructor(props){
        super(props);
        let ds=new ListView.DataSource({
            rowHasChanged:(row1,row2) =>row1!==row2
        });
        let movies=[{title:'肖申克的救赎'},
            {title:'这个杀手不太冷'},
            {title:'阿甘正传'},
            {title:'霸王别姬'},
            {title:'美丽人生'},];
        this.state={
         movies:ds.cloneWithRows(movies),
         loaded:false
        };
    }
   //将要加载数据
    componentDidMount() {
        this.fetchData()
    }
    //从Api_url抓取数据
    fetchData(){
        fetch(Api_url)
            .then(response=>response.json())
            .then(responseData=>{
                   this.setState({
                       //更新状态
                   movies:this.state.movies.cloneWithRows(responseData.subjects),
                   loaded:true
                })
            }).done() //表示完成
    }
    renderMoviesList(movie){
     return(
         <View style={styles.item}>
         <View style={styles.itemImage}>
             <Image source={{uri:movie.images.large}}></Image>
         </View>
         <View style={styles.itemContent}>
             <Text style={styles.itemHeader}>{movie.title}</Text>
             <Text style={styles.itemMeta}>{movie.original_title}({movie.year})</Text>
             <Text style={styles.redText}>{movie.rating.average}</Text>
         </View>
     </View>)
    }
    render() {
        if(!this.state.loaded){
           return(
               <View>
                   <text style={styles.loading}>
                       加载中...
                   </text>
               </View>
           )
        }
        return (
            <View>
                <ListView
                    dataSource={this.state.movies}
                    renderRow={this.renderMoviesList}>
                </ListView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item:{
        flexDirection:'row',
        borderBottom:1,
        borderColor:'rgba(100,53,201,0.1)',
        paddingBottom:6,
        marginBottom:6,
        flex:1
    },
    itemContent:{
        flex:1,
        marginLeft:13,
        marginTop:6
    },
    itemHeader:{
        fontSize:18,
        color:'#6435c9',
        fontWeight:'300',
        marginBottom:6
    },
    itemMeta:{
       fontSize:16,
        color:'rgba(,0,0,0,0.5)'
    },
    redText:{
       color:'#db2828',
        fontSize: 15,
    },
    loading:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
});
AppRegistry.registerComponent('Movies', () => ListView);
