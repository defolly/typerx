import {
  GET,
  Path,
  PathParam,
  POST,
  PUT,
  DELETE,
  QueryParam,
  Context,
  ServiceContext,
  Preprocessor,
} from 'typescript-rest';
import { Tags, Security } from 'typescript-rest-swagger';
import { Appearance } from './../../types/appearance';
import { AccountService } from './account.service';
import { Account } from './interfaces/account.interface';
import { validator } from '../../util/validator';
import { CreateAccountDto, EditAccountDto, AccountResponse } from './dto/account.dto';

/**
 * 帐号管理.
 */
@Tags('core')
@Path('/api/account')
export class AccountController {
  @Context context: ServiceContext;

  constructor(private readonly service: AccountService) {
    this.service = new AccountService(this.context);
  }


  /**
   * 创建帐号
   * @param entry 帐号信息
   */
  @POST
  async create(entry: CreateAccountDto): Promise<AccountResponse> {
    return this.service.create(entry);
  }


  /**
   * 更新帐号
   * @param entry 帐号信息
   */
  @PUT
  async update(entry: EditAccountDto): Promise<AccountResponse> {
    const admin: any = this.context.request.user;
    return this.service.update(entry, admin);
  }

  /**
   * 获取帐号管理界面配置信息.
   */
  @Path('config')
  @GET
  async getConfig(): Promise<Appearance> {
    return this.service.getAppearance();
  }

  /**
   * 按关键词查询账号
   *
   * @param {string} [keyword]
   * @returns {Promise<Account[]>}
   * @memberof AccountController
   */
  @Path('search')
  @GET
  @Preprocessor(validator)
  async getAccountsByKeyword(
    @QueryParam('keyword') keyword?: string,
  ): Promise<AccountResponse[]> {
    return this.service.getAccountsByKeyword(keyword);
  }

  /**
   * * 按分类获取帐号数据
   *
   * @param {string} category 分类键名
   * @returns {Promise<AccountResponse[]>}
   * @memberof AccountController
   */
  @Path('category/:category')
  @GET
  async getAccountByCategory(
    @PathParam('category') category: string,
  ): Promise<AccountResponse[]> {
    return [];
  }
}
