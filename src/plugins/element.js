import Vue from 'vue'
// 组件太多可以回车换行
import {
    Form,
    FormItem,
    Input,
    Button,
    message,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    Submenu,
    MenuItemGroup,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Switch,
    Tooltip,
    Pagination,
    Dialog,
    MessageBox,
    Tag,
    DatePicker,
    Upload,
    Select,
    ButtonGroup,
    Option,
    Carousel,
    CarouselItem,
    Calendar,
    Tabs,
    TabPane,
} from 'element-ui'


// Vue.use(Input);
// Vue.use(Form);
Vue.use(Button);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);
// Vue.component(Button.name, Button);
Vue.prototype.$message = message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Switch);
Vue.use(Tooltip);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Tag);
Vue.use(DatePicker);
Vue.use(Upload);
Vue.use(Select);
Vue.use(ButtonGroup);
Vue.use(Option);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(CarouselItem);
Vue.use(Calendar);
Vue.use(Tabs);
Vue.use(TabPane);
