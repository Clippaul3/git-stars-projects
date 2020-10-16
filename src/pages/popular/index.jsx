import React, {Component} from 'react';
import './index.scss';
import LanguageLinnk from "../../components/language-link";
import axios from 'axios'
import {Spin, Alert} from 'antd'
import 'font-awesome/less/font-awesome.less';
import 'react-fontawesome';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faStar, faCopy, faShareSquare, faComment, faWindowClose} from '@fortawesome/free-regular-svg-icons'

class Popular extends Component {

    state = {
        projects: [],
        language: '',
        page: 1,
        isLoading: false,
        isSwitching: false,
        isWrongPage: false,
    }

    componentDidMount() {
        this.loadData()
    }

    componentDidCatch(error, errorInfo) {
        console.log('错啦');
        console.log(errorInfo, error)
    }

    handle = () => {
        let {page, isLoading} = this.state
        let onPullUpHeight = this.refs.isReachBottom.clientHeight;
        let documentHeight = document.documentElement.clientHeight;
        let documentTop = document.documentElement.scrollTop;
        if ((documentHeight > onPullUpHeight || onPullUpHeight <= documentHeight + documentTop) && !isLoading) {
            page++
            this.setState({page}, () => {
                this.loadData()
            })
        }
    }


    loadData = () => {
        let {page} = this.state
        // let {language} = window.localStorage
        let language = this.props.location.search.split('=')[1]
        this.setState({isLoading: true}, () => {
            axios.get(
                `https://api.github.com/search/repositories?q=stars:%3E1+language:${language}&sort=stars&order=desc&type=Repositories&page=${page}`
            ).then((res) => {
                console.log('页面查询结果', res)
                console.log('错误',res.message);
                if (res.status != 200) {
                    this.setState({isLoading: false, isSwitching: false, isWrongPage: true})
                } else {
                    if (page == 1) {
                        this.setState({
                            projects: res.data.items,
                            isLoading: false,
                            isSwitching: false,
                            isWrongPage: false
                        })
                    } else {
                        let moreProjects = this.state.projects.concat(res.data.items)
                        this.setState({
                            projects: moreProjects,
                            isLoading: false,
                            isSwitching: false,
                            isWrongPage: false
                        })
                    }
                }
                if(this.refs.isReachBottom){
                    this.refs.isReachBottom.addEventListener('mousewheel', this.handle.bind(this))
                }
            }).catch(err => {
                console.log('错误信息',JSON.parse(JSON.stringify(err)),typeof err.message)
                this.setState({isWrongPage: true,isLoading:false,isSwitching: false,errMsg:err.message})
            })
        })
    }

    switchLanguage = (language) => {
        let {isSwitching} = this.state
        if (!isSwitching) {
            this.setState({language, page: 1, isSwitching: true}, () => {
                this.loadData()
            })
        }
    }

    render() {
        let {projects, language, isLoading, isSwitching, isWrongPage} = this.state
        return (
            <div>
                {
                    isWrongPage ?
                        <div className={'wrong-page'}>
                            <div>
                                <FontAwesomeIcon className={'wrong-page-icon'} icon={faWindowClose}/>
                            </div>
                            <div className={'wrong-page-content'}>
                                页面错误，请<a onClick={this.loadData.bind(this)}>刷新</a>重试
                            </div>
                            <div>
                                错误信息:
                            </div>
                            <div>
                                {this.state.errMsg}
                            </div>
                            <div className={'spin-container'}>
                                <Spin spinning={isLoading} size={"large"} tip={'加载中...'}/>
                            </div>
                        </div> :
                        <div className="git-stars" ref={'isReachBottom'}>
                            {
                                isSwitching &&
                                <div className={'switch-container'}>
                                    <Spin spinning={isLoading} size={"large"} tip={'加载中...'}/>
                                </div>
                            }
                            <LanguageLinnk onChange={this.switchLanguage.bind(this)}/>
                            <div className={'git-stars-body'}>
                                {
                                    projects.map((project, index) => (
                                        <div key={index} className={'git-stars-item'}>
                                            <div className={'git-stars-item-no'}>#{index}</div>
                                            <div className={'git-stars-logo'}>
                                                <img className={'git-stars-img'} src={project.owner.avatar_url}/>
                                            </div>
                                            <div className={'git-stars-name'}>{project.name}</div>
                                            <div className={'git-stars-info'}>
                                                <div className={'git-stars-info-name'}>
                                                    <FontAwesomeIcon className={'icon'} icon={faUser}/>
                                                    {project.name}
                                                </div>
                                                <div className={'git-stars-star-count'}>
                                                    <FontAwesomeIcon className={'icon'} icon={faStar}/>
                                                    {project.stargazers_count}
                                                </div>
                                                <div className={'git-stars-forks'}>
                                                    <FontAwesomeIcon className={'icon'} icon={faShareSquare}/>
                                                    {project.forks_count}
                                                </div>
                                                <div className={'git-stars-issues'}>
                                                    <FontAwesomeIcon className={'icon'} icon={faComment}/>
                                                    {project.open_issues_count}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className={'spin-container'}>
                                    <Spin spinning={isLoading} size={"large"} tip={'加载中...'}/>
                                </div>
                            </div>
                        </div>

                }
            </div>
        )

    }
}

export default Popular;
