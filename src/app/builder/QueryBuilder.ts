/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery, Query } from 'mongoose';
import Category from '../modules/Category/Category.model';
import Subcategory from '../modules/Subcategory/Subcategory.model';

interface QueryParams {
  searchTerm?: string;
  page?: number;
  limit?: number;
  sort?: string;
  sortOrder?: string;
  fields?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  private query: QueryParams;
  private defaultLimit = 20;
  categoryModel: any;
  subCategoryModel: any;

  constructor(modelQuery: Query<T[], T>, query: QueryParams) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  /**
   * Adds a search functionality to the query by matching against provided fields.
   * @param searchableFields - List of fields to search in.
   */
  public search(searchableFields: string[]) {
    const searchTerm = this.query.searchTerm;

    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (key) =>
            ({
              [key]: {
                $regex: searchTerm,
                $options: 'i',
              },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  /**
   * Filters the query based on query parameters excluding reserved fields.
   * Translates category and sub_category slugs to IDs before filtering.
   */
  public async filter() {
    const queryObj = { ...this.query };
    const excludeFields = [
      'searchTerm',
      'page',
      'limit',
      'sort',
      'sortOrder',
      'fields',
    ];
    excludeFields.forEach((el) => delete queryObj[el]);

    // Translate category slug to ID
    if (queryObj.category) {
      const category = await Category.findOne({
        slug: queryObj.category,
      });
      if (category) {
        this.modelQuery = this.modelQuery.find({ category: category._id });
      }
      delete queryObj.category; // Remove after applying filter
    }

    // Translate sub_category slug to ID
    if (queryObj.sub_category) {
      const subCategory = await Subcategory.findOne({
        slug: queryObj.sub_category,
      });
      if (subCategory) {
        this.modelQuery = this.modelQuery.find({
          sub_category: subCategory._id,
        });
      }
      delete queryObj.sub_category; // Remove after applying filter
    }

    // Apply the rest of the filters
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  /**
   * Sorts the query results based on the sort parameter or defaults to '-createdAt'.
   */
  public sort() {
    const sort = this.query.sort
      ? this.query.sort.split(',').join(' ')
      : 'createdAt';
    const sortOrder = this.query.sortOrder ?? 'desc';

    this.modelQuery = this.modelQuery.sort({
      [sort]: sortOrder === 'asc' ? 1 : -1,
    });

    return this;
  }

  /**
   * Limits the fields returned in the query results.
   */
  public fields() {
    const fields = this.query.fields
      ? this.query.fields.split(',').join(' ')
      : '-__v';

    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }

  /**
   * Paginates the query results based on page and limit parameters.
   */
  public paginate() {
    const limit = this.query.limit
      ? Number(this.query.limit)
      : this.defaultLimit;
    const page = this.query.page ? Number(this.query.page) : 1;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  /**
   * Counts the total number of documents matching the query.
   */
  public async countTotal() {
    const limit = this.query.limit
      ? Number(this.query.limit)
      : this.defaultLimit;
    const page = this.query.page ? Number(this.query.page) : 1;
    const filter = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPages,
    };
  }

  /**
   * Executes the query and returns the results.
   */
  public async exec() {
    return await this.modelQuery.exec();
  }

  /**
   * Resets the query builder state, useful for reusing the same builder instance.
   */
  public reset(modelQuery: Query<T[], T>, query: QueryParams) {
    this.modelQuery = modelQuery;
    this.query = query;
    return this;
  }
}

export default QueryBuilder;
