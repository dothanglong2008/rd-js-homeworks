function visitLink(path) {
	let linkVisitCount = localStorage.getItem(path) || 0;
	linkVisitCount++;
	localStorage.setItem(path, linkVisitCount);
}

function viewResults() {
	const content = document.getElementById('content');
	const ul = document.createElement('ul');
	content.appendChild(ul);
	for (let i = 0; i < localStorage.length; i++) {
		let page = localStorage.key(i);
		let clickCount = localStorage.getItem(page)
		const li = document.createElement('li');
		li.innerHTML = 'You visited ' + page + ' ' + clickCount + ' time(s)';
		ul.appendChild(li);
	}
	localStorage.clear();
}
