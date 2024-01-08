import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
};
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

export const CreatePost = () => {

    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');

    async function createPost(e) {
        e.preventDefault();

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('file', files[0]);
        data.set('content', content);

        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
            credentials: 'include'
        });

        if (response.ok) {
            setRedirect(!redirect);
        }
    }

    if (redirect) {
        navigate('/');
    }

    return (
        <div>
            <form onSubmit={createPost}>
                <input type="title" placeholder={'Title'} onChange={(e) => setTitle(e.target.value)} />
                <br /><br />
                <input type="summary" placeholder={'Summary'} onChange={(e) => { setSummary(e.target.value) }} />
                <br /><br />
                <input type="file" onChange={(e) => { setFiles(e.target.files) }} />
                <br /><br />
                <ReactQuill
                    value={content}
                    modules={modules}
                    formats={formats}
                    onChange={newValue => setContent(newValue)}
                />
                <button>Create Post</button>
            </form>
        </div>
    )
}