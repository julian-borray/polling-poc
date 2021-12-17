import axios from "axios";
import IItem from "../../common/interfaces/IItem";

export class ItemProvider {
    async searchItem(keyWord: string): Promise<IItem> {
        try {
            const {data} = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${keyWord}`);
            let result: IItem ={
                author: {
                    name: 'Julian',
                    lastname: 'Borray'
                },
                categories: [],
                items: []
            };
            if(data.results.length > 0) {
                result = {
                    author: {
                        name: 'Julian',
                        lastname: 'Borray'
                    },
                    categories: data.filters.length > 0 ? data.filters[0].values[0].path_from_root.map((category: any) => {
                        return category.name
                    }) : [],
                    items: this.getProduct(data.results)
                }
            }
            return result;
        } catch (err) {
            throw err.message;
        }
    }

    async getItem(itemId: string): Promise<IItem> {
        let data = null;
        let description = null;
        const result: IItem = {
            author: {
                name: 'Julian',
                lastname: 'Borray'
            },
            items: []
        }
        try {
           data = await axios.get(`https://api.mercadolibre.com//items/${itemId}`).then(response => response.data);
           description = await axios.get(`https://api.mercadolibre.com//items/${itemId}/description`).then(response => response.data);
            result.items = this.getProduct(data, description.plain_text);
            return result;
        } catch (err) {
            if (err.config.url.indexOf("description")>0){
                result.items = this.getProduct(data, "");
                return result;
            }
            throw err.message;
        }
    }

    private getProduct(products: any, description = '') {
        const items = [];
        if (products.length === undefined) {
            items.push({
                "id": products.id,
                "title": products.title,
                "price": {
                    "currency": products.currency_id,
                    "amount": products.price,
                },
                "picture": products.pictures[0].url,
                "condition": products.condition,
                "free_shipping": products.shipping.free_shipping,
                "sold_quantity": products.sold_quantity,
                "description": description,
                "address": products.seller_address.state.name
            })
        } else {
            for (let i = 0; i < 4; i++) {
                items.push({
                    "id": products[i].id,
                    "title": products[i].title,
                    "price": {
                        "currency": products[i].currency_id,
                        "amount": products[i].price,
                    },
                    "picture": `https://http2.mlstatic.com/D_Q_NP_${products[i].thumbnail_id}-Q.webp`,
                    "condition": products[i].condition,
                    "free_shipping": products[i].shipping.free_shipping,
                    "address": products[i].address.state_name
                })
            }
        }
        return items;
    }
}
