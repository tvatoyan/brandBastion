import { useState } from 'react'
import { Input, Modal, Form, Button, Row } from 'antd'
import { useComment } from '../../../hooks'

interface Props {
    isModalOpen: boolean
    postId: number
    handleCancel: () => void
}

const AddCommentModal = ({ isModalOpen, postId, handleCancel }: Props) => {
    const [comment, setComment] = useState<string>('')
    const { addComment } = useComment()
    const [form] = Form.useForm();

    const onSubmit = () => {
        form.resetFields()
        addComment({
            postId,
            name: comment,
            email: 'test@mail.com',
            body: 'some test body'
        })
        handleCancel()
    }

    return (
        <Modal title="Add Comment Modal" open={isModalOpen} onCancel={handleCancel} footer={null}>
            <Form form={form} onFinish={onSubmit}>
                <Form.Item
                    label="Comment"
                    name="comment"
                    rules={[{ required: true, message: 'Please input your comment!' }]}
                >
                    <Input value={comment} name='comment' onChange={e => setComment(e.target.value)} />
                </Form.Item>
                <Form.Item>
                    <Row justify='end'>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Row>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddCommentModal