import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Editor } from '../components/Editor';

export const CreatePost = () => {

    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [category, setCategory] = useState('');

    async function createPost(e) {
        e.preventDefault();

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('file', files[0]);
        data.set('content', content);
        data.set('category', category);

        const response = await fetch('http://localhost:4000/posts/createpost/', {
            method: 'POST',
            body: data,
            credentials: 'include'
        });
        if (response.ok) {
            navigate('/');
        }
    }

    return (
        <div>
            <Link to={'/'}><button>Go Home</button></Link>
            <br /><br />
            <form onSubmit={createPost}>
                <input type="title"
                    placeholder={'Title'}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                <br /><br />
                <input type="summary"
                    placeholder={'Summary'}
                    value={summary}
                    onChange={(e) => { setSummary(e.target.value) }} />
                <br /><br />
                {/* <input type="category"
                    placeholder={'Category'}
                    value={category}
                    onChange={(e) => { setCategory(e.target.value) }} />
                <br /><br /> */}
                <input type="file"
                    onChange={(e) => { setFiles(e.target.files) }} />
                <br /><br />
                <Editor value={content} onChange={setContent} />
                <button>Create Post</button>
            </form>
        </div>
    )
}