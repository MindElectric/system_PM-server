import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, BelongsToMany, HasMany } from "sequelize-typescript";
import Marca from "./Marca.model";
import Area from "./Area.model";
import CategoriaMaterial from "./Categoria_Material.model";
import Proveedor from "./Proveedor.model";
import MaterialProveedor from "./Material_Proveedor.model";
import Notification from "./Notifications.model";


@Table({
    tableName: 'material',
})
class Material extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;

    @Column({
        type: DataType.STRING(150),
        allowNull: false
    })
    declare descripcion: string;

    @Column({
        type: DataType.DECIMAL,
        allowNull: false
    })
    declare cantidad: number;

    @Column({
        type: DataType.STRING(30),
        allowNull: false
    })
    declare codigo: string;

    @Column({
        type: DataType.DECIMAL,
        allowNull: false
    })
    declare costo: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare minimo: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare maximo: number;

    @Column({
        type: DataType.STRING(30),
        allowNull: false
    })
    declare modelo: string;

    @ForeignKey(() => Marca)
    @Column
    declare id_marca: number;

    @BelongsTo(() => Marca)
    declare marca: Marca;

    @ForeignKey(() => Area)
    @Column
    declare id_area: number;

    @BelongsTo(() => Area)
    area: Area;

    @ForeignKey(() => CategoriaMaterial)
    @Column
    declare id_categoria_material: number;

    @BelongsTo(() => CategoriaMaterial)
    categoriaMaterial: CategoriaMaterial;

    @BelongsToMany(() => Proveedor, () => MaterialProveedor)
    proveedores: Proveedor[];

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: 'createdat'
    })
    declare createdAt: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
        field: 'updatedat'
    })
    declare updatedAt: Date;

    @HasMany(() => Notification)
    notifications: Notification[];
}

export default Material;