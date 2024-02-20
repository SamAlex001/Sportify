import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Editor } from '../components/Editor';
import { Navbar } from '../components/Navbar';
import '../styles/createPost.css';

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
            <Navbar />
            <form onSubmit={createPost} className="create-post-container">
                <div className="cp-contentWrapper">
                    <div className="cp-titleWrapper">
                        <div className="cp-title-header">Title:</div>
                        <input type="title"
                            placeholder={'Title'}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="cp-summaryWrapper">
                        <div className="cp-summary-header">Summary:</div>
                        <input type="summary"
                            placeholder={'Summary'}
                            value={summary}
                            onChange={(e) => { setSummary(e.target.value) }} />
                    </div>
                    {/* 
                        <input type="category"
                        placeholder={'Category'}
                        value={category}
                        onChange={(e) => { setCategory(e.target.value) }} />
                        <br /><br /> 
                    */}
                    <div className="cp-fileWrapper">
                        <div className="cp-file-container">Thumbnail:</div>
                        <input type="file"
                            onChange={(e) => { setFiles(e.target.files) }} />
                        <br /><br />
                    </div>
                </div>
                <div className="cp-editorWrapper">
                    <Editor value={content} onChange={setContent} />
                </div>
                <div className="cp-btnWrapper">
                    <button className="cp-create-btn">Create Post</button>
                </div>
            </form>
        </div>
    )
}