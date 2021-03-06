import './style.sass';
import component from './vsSidebar';
component.install = function (vue) {
    vue.component('vs-sidebar', component);
};
if (typeof window !== 'undefined' && window.Vue) {
    component.install(window.Vue);
}
export default component;
