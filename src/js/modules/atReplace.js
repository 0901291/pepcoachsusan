export default function atReplace() {
    document.querySelectorAll('.__AT_').forEach(el => {
        el.innerHTML = '@';
    });
}