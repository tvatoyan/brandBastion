import { useState, MouseEvent } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Tag, AutoComplete, Modal, Button, Row } from 'antd'
import { Key } from '../../../store/types'
import { useComment } from '../../../hooks'

interface Props {
    isModalOpen: boolean
    commentId: Key | null
    handleCancel: () => void
}

const SUGGESTED_OPTIONS = [
    { value: 'suggested tag 1' },
    { value: 'suggested tag 2' },
    { value: 'suggested tag 3' },
  ];

const AddTagModal = ({ isModalOpen, commentId, handleCancel }: Props) => {
    const [tags, setTags] = useState<string[]>([])
    const [inputVisible, setInputVisible] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState('')
    const { addTags } = useComment()

    const handleClose = (removedTag: string) => {
        const newTags = tags.filter(tag => tag !== removedTag);
        setTags(newTags);
    };

    const handleTagClose = (e: MouseEvent, tag: string) => {
        e.preventDefault();
        handleClose(tag);
    };

    const handleInputChange = (text: string) => {
        setInputValue(text);
    };

    const showInput = () => {
        setInputVisible(true);
    };

    const onSubmit = () => {
        addTags(tags, commentId as Key)
        setTags([])
        handleCancel()
    }

    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
    };

    const forMap = (tag: string) => {
        const tagElem = (
            <Tag closable onClose={e => handleTagClose(e, tag)}>
                {tag}
            </Tag>
        );
        return (
            <span key={tag} style={{ display: 'inline-block' }}>
                {tagElem}
            </span>
        );
    };

    return (
        <Modal title="Add Tags Modal" open={isModalOpen} footer={null} onCancel={handleCancel}>
            <div style={{ marginBottom: 16 }}>
                {tags.map(forMap)}
            </div>
            {inputVisible && (
                <AutoComplete
                    size="small"
                    style={{ width: 200 }}
                    options={SUGGESTED_OPTIONS}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    filterOption={(inputValue, option) =>
                        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                />
            )}
            {!inputVisible && (
                <Tag onClick={showInput}>
                    <PlusOutlined /> New Tag
                </Tag>
            )}
             <Row justify='end'>
                <Button disabled={!tags.length} type="primary" onClick={onSubmit}>
                    Submit
                </Button>
            </Row>
        </Modal>
    )
}

export default AddTagModal