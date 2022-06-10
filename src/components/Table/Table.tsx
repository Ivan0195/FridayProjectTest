import React from 'react';
import styles from './Table.module.css';
import cn from 'classnames';

type ColumnType = {
  id: string;
  value: JSX.Element | string | number;
  render?: (item: any) => JSX.Element | string | number;
};

type ItemType = {
  [key: string]: any
};

type TablePropsType = {
  columns: ColumnType[];
  items: ItemType[];
  itemRowKey?: string;
  loading?: boolean | null;
};

export const Table: React.FC<TablePropsType> = (
  { columns, items, itemRowKey = 'id', loading }
) => {
  if (items.length && !items[0][itemRowKey]) {
    console.error(`Each table element must have a unique property with a key \`id\`, or set \`itemRowKey\` to an unique primary key`);
  }

  return (
    <table className={styles.table}>
      <thead>
      <tr>
        { columns.map((column) => <th key={ column.id } className={styles.tableHeader}>{ column.value }</th>) }
      </tr>
      </thead>
      <tbody>
      {
        !loading
          ? (
            items.length
              ? items.map((item) => {
                return (
                  <tr key={ item[itemRowKey] as string | number } className={styles.row}>
                    {
                      columns.map((column) => {
                        return <td key={ `${ column.id }${ item[itemRowKey] as string | number }` }  className={styles.tableCell}>
                          { column.render ? column.render(item) : (item[column.id] as JSX.Element | string | number) }
                        </td>
                      })
                    }
                  </tr>
                );
              })
              : (
                <tr className={ styles.row }>
                  <td colSpan={ columns.length } className={ styles.tableCell }>No data</td>
                </tr>
              )
          )
          : (
            <tr>
              <td colSpan={ columns.length } className={ cn(styles.tableCell, styles.tableCellCentered) }>
                Loading...
              </td>
            </tr>

          )
      }
      </tbody>
    </table>
  );
};
