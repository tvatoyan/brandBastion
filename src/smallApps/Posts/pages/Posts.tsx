import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Col, List, Space, Typography, Input } from 'antd';
import { usePost } from '../../../hooks'
import { Post } from '../../../store/types'

const { Search } = Input;

const Posts = () => {
    const { getListData, fetchPosts, setFilter } = usePost()
    const { push } = useHistory()
    const data = getListData()

    useEffect(() => {
      fetchPosts()
    }, [])

    return (
        <Row>
            <Col span={24}>
                <Search 
                    placeholder="search by Title"
                    onChange={e => setFilter(e.target.value)}
                    style={{ width: 200 }}
                />
                <List
                    bordered
                    dataSource={data as Post[]}
                    renderItem={item => (
                        <List.Item>
                            <Space direction='vertical'>
                                <Typography.Text>Title: {item.title}</Typography.Text>
                                <Typography.Text>UserId: {item.userId}</Typography.Text>
                                <Typography.Paragraph>Body: {item.body}</Typography.Paragraph>
                            </Space>
                            <Typography.Link onClick={() => push(`/comments/${item.id}`)}>
                                see comments
                            </Typography.Link>
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    )
}

export default Posts