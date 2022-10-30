import { useState, useEffect } from 'react'
import { useComment } from '../../../hooks'
import { useParams } from 'react-router-dom'
import { Key } from '../../../store/types'
import AddCommentModal from '../components/AddCommentModal'
import AddTagModal from '../components/AddTagModal'
import { List, Typography, Button, Space, Tag } from 'antd'

const Comments = () => {
    const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false)
    const [selectedId, setSelectedId] = useState<Key | null>(null)
    const { id } = useParams<{ id: string }>()
    const { getListData, fetchComments } = useComment()
    const data = getListData()

    useEffect(() => {
        fetchComments(+id)
    }, [])

    return (
        <Space size={20} direction='vertical' style={{ width: '100%' }}>
            <Button onClick={() => setIsCommentModalOpen(true)}>Add comment</Button>
            <List
                bordered
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <Space direction='vertical'>
                            <Typography.Text>{item.name}</Typography.Text>
                            <Space>
                                {item.tags?.map((item, index) => <Tag key={index}>{item}</Tag>)}
                            </Space>
                        </Space>
                        <Button onClick={() => setSelectedId(item.id)}>Add tag</Button>
                    </List.Item>
                )}
            />
            <AddTagModal isModalOpen={!!selectedId} commentId={selectedId} handleCancel={() => setSelectedId(null)} />
            <AddCommentModal isModalOpen={isCommentModalOpen} postId={+id} handleCancel={() => setIsCommentModalOpen(false)} />
        </Space>
    )
}

export default Comments