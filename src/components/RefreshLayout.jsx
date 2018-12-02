/**
 * Created by RaoMeng on 2018/12/1
 * Desc: antd刷新组件二次封装
 */

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {PullToRefresh} from "antd-mobile";
import PropTypes from 'prop-types'

export default class RefreshLayout extends Component {

    static propTypes = {
        direction: PropTypes.string,
        refreshing: PropTypes.bool.isRequired,
        style: PropTypes.object,
        onRefresh: PropTypes.func.isRequired,
        damping: PropTypes.number,
        distanceToRefresh: PropTypes.number,
    }

    static defaultProps = {
        direction: 'up',
        damping: 120,
        distanceToRefresh: 30
    }

    constructor() {
        super()

        this.state = {
            height: document.documentElement.clientHeight
        }
    }

    componentDidMount() {
        setTimeout(() => {

            if (this.props.height) {
                this.setState({
                    height: this.props.height,
                })
            } else {
                const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
                this.setState({
                    height: hei
                })
            }
        }, 0);
    }

    render() {
        const {height} = this.state
        const {direction, refreshing,style, onRefresh, damping, distanceToRefresh} = this.props

        return (
            <PullToRefresh
                direction={direction}
                refreshing={refreshing}
                ref={el => this.ptr = el}
                style={{
                    height: height,
                    overflow: 'auto',
                    ...style
                }}
                damping={damping}
                distanceToRefresh={distanceToRefresh}
                onRefresh={onRefresh}>
                {this.props.children}
            </PullToRefresh>
        )
    }
}