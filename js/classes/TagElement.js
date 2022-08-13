class TagElement {
    constructor (name, content ,...attribute) {     
        this.name = name;
        this.content = content;
        this.attribute = attribute;
    }

    render(parentsSelector) {       
        const tagAttribute = this.attribute;
        
        const newTag = document.createElement(`${this.name}`);
        newTag.insertAdjacentText('afterbegin', `${this.content}`);

        tagAttribute.forEach(e => {
            const name = e.name;
            const value = e.value;

            if (e.name == 'class') {
                newTag.classList.add(`${value}`);
            } else {
                newTag.setAttribute(name, value);
            }
        });

        parentsSelector.append(newTag);
    }       
}