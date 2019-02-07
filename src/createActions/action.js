
import axios from "axios"
import async from "async"
import { HOME_INIT, TIME_INIT, GOODS_INIT,SPIN_INIT, DETAIL_INIT,NUM_INIT } from "./actionType";

export let setHomeList=(bannerList,hotList)=>({
    type:HOME_INIT,
    bannerList,
    hotList
})

export let getHomeData=()=>dispatch=>{
    async.parallel({
        bannerList(cd){
            axios.get("/json/jsondata.json")
                .then(({data})=>{
                    cd(null,data.bannerList)
                })
        },
        hotList(cd){
            axios.get("/json/jsondata.json")
                .then(({data})=>cd(null,data.hotList))
        }
    },(err,{bannerList,hotList})=>{
        dispatch(setHomeList(bannerList.banner,hotList))
    })
}
export let setTime=(time)=>({
    type:TIME_INIT,
    time
})
export let getTime=dispatch=>{
    setInterval(function(){
        let date =new Date()
        let lastDate=new Date("2019/02/05 00:00:00")
        let time=(lastDate-date)/1000
        let day=parseInt(time/(24*60*60))
        let hour=parseInt((time%(24*3600))/(60*60))
        let min=parseInt((time%(60*60))/60)
        let sec=parseInt(time%60)
        let newTime="距离本期结束 "+day+" 天 "+hour+" 时 "+min+" 分 "+sec+" 秒"
        dispatch(setTime(newTime))
    },1000)
}

export let setGoodsList=(list,count,currentPage,pageSize,sort,key,asc)=>({
    type:GOODS_INIT,
    list,
    count,
    currentPage,
    pageSize,
    sort,
    key,
    asc
})
export let setSpin=isSpin=>({
    type:SPIN_INIT,
    isSpin
})

export let GetGoodsData=(page=1,pageSize=3,sort="title",key="",asc="1")=>dispatch=>{
    // console.log(asc)
    dispatch(setSpin(true))
    if(key=="default"){
        key=""
    }
    if(sort=="name"){
        sort="title"
    }
    axios.get("/goodslist",{params:{page,pageSize}})
        .then(({data})=>{      
                let everyList=[];
                let arr=[];
                data.data.map((item)=>{
                    if(item["title"].indexOf(key)!=-1||item["tradeItemId"].indexOf(key)!=-1||item["_id"].indexOf(key)!=-1){
                        arr.push(item)
                    }
                })
                if(sort=="price"||sort=="sale"){
                    arr.sort((item1,item2)=>{
                        return Number(item1[sort])-Number(item2[sort])
                    })
                }else{
                    // console.log(arr)
                    arr.sort((item1,item2)=>{
                        
                        return item1[sort].localeCompare(item2[sort], 'zh-CN');
                    })
                }
                if(asc==0){
                    arr.reverse();
                }
                if((page)*(pageSize)<=arr.length){
                    for(let i=(page-1)*(pageSize);i<(page)*(pageSize);i++){
                        everyList.push(arr[i])
                    }
                }else{
                    for(let i=(page-1)*(pageSize);i<arr.length;i++){
                        everyList.push(arr[i])
                    }
                }
            dispatch(setGoodsList(everyList,arr.length,page,pageSize,sort,key,asc))
            dispatch(setSpin(false))
        })

}

export let setDetailList=(goods)=>({
    type:DETAIL_INIT,
    goods
})
export let getDetailData=(goodsID)=>dispatch=>{
    axios.get("/goodslist")
        .then(({data})=>{
            data.data.map((item)=>{
                if(item._id==goodsID){
                    console.log(item)
                    dispatch(setDetailList(item))
                }
            })
        })
}
export let changeNum=num=>({
    type:NUM_INIT,
    num
})